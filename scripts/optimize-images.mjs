import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve(process.cwd(), 'assets/images');
const WEBP_QUALITY = 78;
const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg']);

const formatBytes = (bytes) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const walk = async (directory) => {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const absolutePath = path.join(directory, entry.name);
			if (entry.isDirectory()) return walk(absolutePath);
			return [absolutePath];
		})
	);
	return files.flat();
};

const toWebp = async (sourcePath) => {
	const ext = path.extname(sourcePath).toLowerCase();
	if (!VALID_EXTENSIONS.has(ext)) return null;

	const targetPath = sourcePath.replace(/\.[^.]+$/u, '.webp');
	// Bake EXIF orientation into pixels before exporting.
	await sharp(sourcePath).rotate().webp({ quality: WEBP_QUALITY }).toFile(targetPath);

	const [sourceStats, targetStats] = await Promise.all([fs.stat(sourcePath), fs.stat(targetPath)]);
	const reduction = ((1 - targetStats.size / sourceStats.size) * 100).toFixed(1);

	return {
		sourcePath,
		targetPath,
		sourceSize: sourceStats.size,
		targetSize: targetStats.size,
		reduction
	};
};

const main = async () => {
	const allFiles = await walk(IMAGES_DIR);
	const imageFiles = allFiles.filter((filePath) =>
		VALID_EXTENSIONS.has(path.extname(filePath).toLowerCase())
	);

	if (imageFiles.length === 0) {
		console.log('No JPG/JPEG files found in assets/images.');
		return;
	}

	const results = [];
	for (const imagePath of imageFiles) {
		const result = await toWebp(imagePath);
		if (result) results.push(result);
	}

	let totalSource = 0;
	let totalTarget = 0;
	for (const result of results) {
		totalSource += result.sourceSize;
		totalTarget += result.targetSize;
		console.log(
			`${path.basename(result.sourcePath)} -> ${path.basename(result.targetPath)} (${formatBytes(result.sourceSize)} -> ${formatBytes(result.targetSize)}, -${result.reduction}%)`
		);
	}

	const totalReduction = ((1 - totalTarget / totalSource) * 100).toFixed(1);
	console.log('');
	console.log(`Converted ${results.length} image(s).`);
	console.log(`Total size: ${formatBytes(totalSource)} -> ${formatBytes(totalTarget)} (-${totalReduction}%)`);
};

main().catch((error) => {
	console.error('Image optimization failed:', error);
	process.exit(1);
});
