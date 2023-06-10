<script>
	import about_me_img from '../images/gusberto_portrait_01.jpeg';
	import { generalContent } from '../content/general-content';
</script>

<section id="about-me" class="flex flex-col md:flex-row gap-8 items-start">
	<div class="flex flex-col flex-[2] gap-2 bg-orange p-4 rounded-lg">
		<p class="text-sm text-white">
			{@html generalContent.homeAbout}
		</p>
		<div class="flex gap-2 items-start flex-wrap gap-">
			<a class="btn-link btn-link-highlight px-4 py-2" href={generalContent.linkedin}>linkedin</a>
			<a class="btn-link btn-link-highlight px-4 py-2" href={generalContent.github}>github</a>
			<a
				class="btn-link px-4 py-2"
				href="./src/images/CV_GiuseppeDiGuglielmo_2023_EN.pdf"
				target="_blank">cv eng (pdf)</a
			>
			<a
				class="btn-link px-4 py-2"
				href="./src/images/CV_GiuseppeDiGuglielmo_2023_EN.pdf"
				target="_blank">cv ger (pdf)</a
			>
		</div>
	</div>
	<div class="flex flex-col flex-1 gap-2 items-start md:max-w-sm max-w-xs">
		<img class="object-cover w-full aspect-[2_/_3]" src={about_me_img} alt="Von Wilhelm Portrait" />
	</div>
</section>

<style>
	.btn-link-highlight {
		@apply bg-black text-white;
	}
</style>
