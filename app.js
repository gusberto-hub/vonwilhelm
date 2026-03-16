import { projectList } from './src/content/projects.js';
import { generalContent } from './src/content/general-content.js';

const slides = [
	{ image: './assets/images/porto-covo.webp', location: 'Porto Covo, Portugal', year: '2021' },
	{ image: './assets/images/africa-burn.webp', location: 'Quaggafontein, South Africa', year: '2025' },
	{
		image: './assets/images/gusberto_portrait_01.webp',
		// location: 'Zurich, Switzerland',
		// year: '2023',
		isAbout: true
	}
];

const site = document.getElementById('site');
const scroller = document.getElementById('scroller');
const projectListElement = document.getElementById('project-list');
const captionElement = document.getElementById('caption');
const noiseToggle = document.getElementById('noise-toggle');
const aboutTemplate = document.getElementById('about-template');
const aboutSlideIndex = slides.length - 1;

const getPrimaryUrl = (project) => {
	if (!project?.links || !Array.isArray(project.links) || project.links.length === 0) {
		return null;
	}

	const firstLink = project.links.find((entry) => typeof entry?.url === 'string' && entry.url.length > 0);
	return firstLink?.url || null;
};

const getLabelFromUrl = (url) => {
	try {
		const parsed = new URL(url);
		return parsed.hostname.replace('www.', '');
	} catch {
		return url;
	}
};

const renderProjects = () => {
	const projectItems = Object.values(projectList);
	const markup = projectItems
		.map((project) => {
			const primaryUrl = getPrimaryUrl(project);
			const title = project?.title || 'Untitled project';
			const year = project?.year || '';

			if (!primaryUrl) {
				return `
					<li class="projects__item">
						<span class="projects__name">${title}</span>
						<span class="projects__year">${year}</span>
					</li>
				`;
			}

			return `
				<li class="projects__item">
					<span class="projects__name">${title}</span>
					<span class="projects__year">${year}</span>
					<a class="projects__link" href="${primaryUrl}" target="_blank" rel="noreferrer noopener">
						${getLabelFromUrl(primaryUrl)}
					</a>
				</li>
			`;
		})
		.join('');

	projectListElement.innerHTML = markup;
};

const updateCaption = (index) => {
	const slide = slides[index];
	if (!slide || slide.isAbout) {
		captionElement.textContent = '';
		return;
	}

	captionElement.textContent = `${slide.location}, ${slide.year}`;
};

const renderSlides = () => {
	const markup = slides
		.map(
			(slide, index) => `
			<section class="site__slide ${slide.isAbout ? 'site__slide--about' : ''}" data-slide-index="${index}">
				<div class="site__image" style="background-image: url('${slide.image}')"></div>
			</section>
		`
		)
		.join('');

	scroller.innerHTML = markup;
	renderAboutSlide();
	updateCaption(0);
};

const renderAboutSlide = () => {
	if (!aboutTemplate) {
		return;
	}

	const aboutSlide = scroller.querySelector(`[data-slide-index="${aboutSlideIndex}"]`);
	const aboutSlideData = slides[aboutSlideIndex];
	if (!aboutSlide) {
		return;
	}

	const aboutNode = aboutTemplate.content.cloneNode(true);
	const aboutPhoto = aboutNode.querySelector('.site__about-photo');
	const githubLink = aboutNode.querySelector('[data-social="github"]');
	const linkedinLink = aboutNode.querySelector('[data-social="linkedin"]');

	if (aboutPhoto && aboutSlideData?.image) {
		aboutPhoto.src = aboutSlideData.image;
	}

	if (githubLink && generalContent.github) {
		githubLink.href = generalContent.github;
	}

	if (linkedinLink && generalContent.linkedin) {
		linkedinLink.href = generalContent.linkedin;
	}

	aboutSlide.appendChild(aboutNode);
};

const setActiveSlideState = (index) => {
	site.classList.toggle('site--about-active', index === aboutSlideIndex);
};

const setupCaptionObserver = () => {
	const sections = scroller.querySelectorAll('[data-slide-index]');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = Number(entry.target.dataset.slideIndex);
					updateCaption(index);
					setActiveSlideState(index);
				}
			});
		},
		{
			root: scroller,
			threshold: 0.6
		}
	);

	sections.forEach((section) => observer.observe(section));
};

const setupNoiseToggle = () => {
	let isNoiseMode = false;

	const syncButtonLabel = () => {
		noiseToggle.textContent = isNoiseMode ? 'noise on' : 'noise off';
		noiseToggle.setAttribute('aria-pressed', String(isNoiseMode));
	};

	noiseToggle.addEventListener('click', () => {
		isNoiseMode = !isNoiseMode;
		site.classList.toggle('site--noise', isNoiseMode);
		site.classList.toggle('site--default', !isNoiseMode);
		syncButtonLabel();
	});

	syncButtonLabel();
};

renderSlides();
renderProjects();
setActiveSlideState(0);
setupCaptionObserver();
setupNoiseToggle();
