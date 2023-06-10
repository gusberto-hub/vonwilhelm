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
	let bgColor = '#ff7777';

	$: startDrawing = false;

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(canvasWidth, canvasWidth * ratio);
			// p5.background(bgColor);
		};

		p5.draw = () => {
			if (startDrawing) {
				if (frameCounter % 100 === 0 && frameCounter > 0) {
					sizeX *= 1.02;
					sizeY *= 1.06;
					centerX *= 1.03;
					centerY *= 1.02;
					frameCounter = 0;
				}

				p5.stroke('rgba(170,170,170,0.1)');
				// p5.stroke(bgColor);
				p5.strokeWeight(0.1);
				p5.line(centerX, centerY / 4 + frameCounter, centerX, centerY * 2 + frameCounter);

				p5.stroke('rgba(0,0,0,1)');
				p5.strokeWeight(0.8);
				p5.point(p5.random(canvasWidth), p5.random(canvasHeight));
				p5.noFill();
				p5.strokeWeight(strokeWeight);
				p5.ellipse(centerX, centerY * 1.2, p5.random(canvasWidth * 6), p5.random(sizeY));

				p5.ellipse(centerX, centerY * 1.2, p5.random(canvasWidth), p5.random(sizeY / 2, sizeY));

				p5.ellipse(centerX, centerY * 1.1, p5.random(centerX / 3), p5.random(0, centerY / 3));

				frameCounter++;
			}
		};

		p5.keyPressed = () => {
			if (p5.key === 's') p5.saveCanvas(projectName, 'png');
		};
	};
</script>

<div class="flex gap-4 w-full max-h-screen">
	<div class="w-1/4 flex flex-col">
		<p>this is the filename</p>
		<label>
			Width
			<input type="range" bind:value={strokeWeight} min="0.01" max="0.2" step="0.01" />
			{strokeWeight}
		</label>
		<label>
			background color
			<input type="color" bind:value={bgColor} />
		</label>
		{#if startDrawing}
			<button on:click={() => (startDrawing = false)}>pause</button>
		{:else}
			<button on:click={() => (startDrawing = true)}>start generating</button>
		{/if}
		<a href="https://coding.com"><button class="btn-primary">github</button></a>
	</div>
	<div class="canvas" style:background={bgColor}>
		<P5 {sketch} />
	</div>
</div>
