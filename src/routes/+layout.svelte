<script>
	import '../styles/app.css';
	import Logo from '../images/Logo.svelte';
	import P5 from 'p5-svelte';

	let contentFromHover = '';

	const checkTarget = (e) => {
		if (e.target.tagName === 'H2') {
			contentFromHover = e.target.textContent;
		} else {
			contentFromHover = '';
		}
	};

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			p5.frameRate(5);
			p5.background(220);
		};

		p5.draw = () => {
			p5.background(220, 220, 220, 40);
		};
		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
		};
		p5.mouseMoved = () => {
			p5.fill('#FF550010');
			p5.textFont('Mondwest');
			p5.textSize(64);
			p5.text(contentFromHover, p5.mouseX - 40, p5.mouseY - 0);
		};
	};
</script>

<div class="w-screen max-w-6xl mx-auto flex flex-col md:flex-row items-start">
	<aside class="sticky left-0 top-0 p-2 flex-shrink-0 flex md:flex-col gap-x-8">
		<a href="/" class="flex-shrink-0"><Logo /></a>
		<nav class="md:mt-12">
			<ul class="flex md:flex-col flex-wrap gap-x-8">
				<li><a href="/#projects">projects</a></li>
				<li><a href="/#about-me">about me</a></li>
				<li><a href="/#creative-coding">creative coding</a></li>
				<li><a href="/photography">&#x2192; photography</a></li>
			</ul>
		</nav>
	</aside>

	<main class="w-full flex-1 flex flex-col gap-y-16">
		<slot />
	</main>
	<div class="fixed left-0 top-0 -z-10">
		<P5 {sketch} />
	</div>
</div>
