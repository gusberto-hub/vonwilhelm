<script>
	import { projectList } from '../content/projects';
</script>

<section id="projects">
	<ul class="flex flex-col gap-y-16">
		{#each Object.values(projectList) as project}
			<li class="">
				<div class="">
					<h2 class="text-4xl mb-2">{project.title} / <span> {project.year}</span></h2>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-4">
					<div class="col-span-2">
						<h3 class="text-sm">about</h3>
						<p class="text-base">
							{@html project.about_text}
						</p>
					</div>
					<div class="">
						<h3 class="text-sm">responsibilities</h3>
						<ul class="list-square-points">
							{#each project?.role as role}
								<li>{role}</li>
							{/each}
						</ul>
					</div>
					<div class="">
						<h3 class="text-sm">tech stack</h3>
						<ul class="list-square-points">
							{#each project?.tech_stack as tech}
								<li>{tech}</li>
							{/each}
						</ul>
					</div>
					<div class="flex gap-2">
						{#if project.links}
							{#each project.links as link}
								<a
									class={`btn-link ${link.highlight ? 'bg-red-500' : ''}`}
									href={link.url}
									target="_blank"
								>
									{link.shortUrl ? link.shortUrl : link.text}
								</a>
							{/each}
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</section>

<style>
	.list-square-points li {
		@apply flex;
	}
	.list-square-points li::before {
		content: '';
		@apply inline-block bg-black h-1 w-1 mt-[0.7em] mr-2 flex-none;
	}
</style>
