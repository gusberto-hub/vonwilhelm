<script>
	import about_me_img from '../images/gusberto_portrait_01.jpeg';
	import { generalContent } from '../content/general-content';
</script>

<section id="about-me" class="lg:flex gap-8 border-y border-gray-700 my-4 py-24">
	<img
		class="object-cover max-w-[14rem] md:max-w-sm rounded-md aspect-square float-left mr-4"
		src={about_me_img}
		alt="Von Wilhelm Portrait"
	/>
	<div>
		<p class="text-sm">
			{@html generalContent.homeAbout}
		</p>
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
</section>
