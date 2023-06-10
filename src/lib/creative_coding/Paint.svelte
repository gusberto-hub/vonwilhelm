<script>
	import P5 from 'p5-svelte';
	const projectName = 'Water_Surface';
	const ratio = 1.0;
	const canvasWidth = 600;
	const canvasHeight = canvasWidth * ratio;

	let sizeX = canvasWidth * 0.06;
	let sizeY = canvasHeight * 0.16;

	let centerX = canvasWidth * 0.25;
	let centerY = canvasHeight * 0.4;

	let frameCounter = 0;

	let distanceToCenter = 0;

	let strokeWeight = 0.02;

	$: startDrawing = false;

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(canvasWidth, canvasWidth * ratio);
			p5.background(255);
		};

		p5.draw = () => {
			if (p5.mouseIsPressed) {
				p5.background('#ddd4');
			}
			p5.noStroke();
			p5.fill(0);
			p5.ellipse(p5.mouseX, p5.mouseY, 80);
		};

		p5.keyPressed = () => {
			if (p5.key === 's') p5.saveCanvas(projectName, 'png');
		};
	};
</script>

<div class="flex gap-4 w-full max-h-screen">
	<div class="w-1/4">
		<p>this is the filename</p>
	</div>
	<div class="canvas">
		<P5 {sketch} />
	</div>
</div>
