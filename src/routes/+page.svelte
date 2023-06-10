<script>
	import Projects from './Projects.svelte';
	import About from './About.svelte';
	import CreativeCoding from './CreativeCoding.svelte';
	import { generalContent } from '../content/general-content';
</script>

<section class="pb-4 flex items-center justify-center text-center min-h-[40rem]">
	<div class="">
		<p class="max-w-2xl">
			{@html generalContent.homeIntro}
		</p>
		<h1 class="text-5xl text-center my-12">Von Wilhelm</h1>
	</div>
</section>

<Projects />

<About />

<section id="ux-ui" class="p-0 max-h-screen">
	<img class="object-cover w-full max-h-full" src="./src/images/ux-ui-sketch.jpg" alt="" />
</section>

<!-- <CreativeCoding /> -->

<section class="">
	<div>
		<p>
			This website has been being rewritten yet again—just so I keep myself going. Nobody’s looking
			but I’m still doing it. It’s not complete and will likely remain incomplete, and that’s fine.
			Although I’m not happy with it nobody will notice anyways, and that’s fine too.
		</p>
		<p class="">Last change: <span class="text-vw_orange">today</span></p>
	</div>
</section>
