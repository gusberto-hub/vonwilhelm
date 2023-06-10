<script>
	import tokyo_images from '../../images/tokyo/tokyo_images'
</script>
<section>
	<h1>photography</h1>
	{#each tokyo_images as image}
		
	<img src={image.file} alt={image.alt}>
	{/each}
</section>
