<script setup lang="ts">
import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions
} from '@headlessui/vue'
import VueFeather from 'vue-feather'

const appName = useRuntimeConfig().public.appName
const route = useRoute()
const routeStore = useRouteStore()
const isSidebarOpen = ref(true)
const isSidebarMobileOpen = ref(false)

function isCurrentRouteActive(current: Route) {
	return current.href === route.path
}

function changeModule(m: Module) {
	routeStore.setActiveModule(m.name)
	navigateTo(m.routes[0].href)
}
</script>

<template>
	<div>
		<TransitionRoot
			as="template"
			:show="isSidebarMobileOpen"
		>
			<Dialog
				class="relative z-50 lg:hidden"
				@close="isSidebarMobileOpen = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-k-tertiary/20" />
				</TransitionChild>

				<div class="fixed inset-0 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div
									class="absolute left-full top-0 flex w-16 justify-center pt-5"
								>
									<button
										aria-label="Close sidebar"
										class="-m-2.5 p-2.5"
										type="button"
										@click="isSidebarMobileOpen = false"
									>
										<span class="sr-only">Close sidebar</span>
										<VueFeather
											type="x"
											aria-hidden="true"
											size="1.25rem"
										/>
									</button>
								</div>
							</TransitionChild>
							<!-- Sidebar component, swap this element with another sidebar if you like -->
							<div
								class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10"
							>
								<div class="flex gap-2 h-24 shrink-0 items-center">
									<img
										class="h-8 w-auto"
										src="/images/katekima-logo.png"
										alt="Katekima logo"
									>
									<span class="font-semibold text-k-tertiary text-2xl">
										{{ appName }}
									</span>
								</div>
								<Listbox
									:value="routeStore.activeModuleName"
									as="div"
								>
									<div class="relative mt-2">
										<ListboxButton
											class="grid w-full cursor-pointer grid-cols-1 rounded-md bg-gray-100 py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-k-tertiary sm:text-sm/6"
										>
											<span class="col-start-1 row-start-1 truncate pr-6">
												{{ routeStore.activeModuleName }}
											</span>
											<VueFeather
												type="chevron-down"
												class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
												aria-hidden="true"
											/>
										</ListboxButton>

										<transition
											leave-active-class="transition ease-in duration-100"
											leave-from-class="opacity-100"
											leave-to-class="opacity-0"
										>
											<ListboxOptions
												class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
											>
												<ListboxOption
													v-for="m in routeStore.modules"
													:key="m.name"
													v-slot="{ active, selected }"
													as="template"
													:value="m.name"
													@click="changeModule(m)"
												>
													<li
														:class="[
															active
																? 'bg-k-tertiary text-white outline-hidden'
																: 'text-gray-900',
															'relative cursor-pointer py-2 pr-9 pl-3 select-none'
														]"
													>
														<span
															:class="[
																selected ? 'font-semibold' : 'font-normal',
																'block truncate'
															]"
														>
															{{ m.name }}
														</span>
														<span
															v-if="selected"
															:class="[
																active ? 'text-white' : 'text-k-tertiary',
																'absolute inset-y-0 right-0 flex items-center pr-4'
															]"
														>
															<VueFeather
																type="check"
																class="size-5"
																aria-hidden="true"
															/>
														</span>
													</li>
												</ListboxOption>
											</ListboxOptions>
										</transition>
									</div>
								</Listbox>
								<nav class="flex flex-1 flex-col">
									<ul
										role="list"
										class="flex flex-1 flex-col gap-y-7"
									>
										<li>
											<ul
												role="list"
												class="space-y-1"
											>
												<li
													v-for="menu in routeStore.activeModuleRoutes"
													:key="menu.name"
												>
													<a
														:class="[
															isCurrentRouteActive(menu)
																? 'bg-gray-100 text-k-tertiary'
																: 'text-gray-700 hover:bg-gray-100 hover:text-k-tertiary',
															'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
														]"
														:href="menu.href"
														class="items-center"
													>
														{{ menu.name }}
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>

		<TransitionRoot
			as="template"
			:show="isSidebarOpen"
		>
			<div
				class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
			>
				<TransitionChild
					as="template"
					enter="transition ease-in-out duration-300 transform"
					enter-from="-translate-x-full"
					enter-to="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leave-from="translate-x-0"
					leave-to="-translate-x-full"
				>
					<div
						class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 shadow-lg"
					>
						<div class="flex gap-2 h-24 shrink-0 items-center">
							<img
								class="h-8 w-auto"
								src="/images/katekima-logo.png"
								alt="Katekima logo"
							>
							<span class="font-semibold text-k-tertiary text-2xl">
								{{ appName }}
							</span>
						</div>
						<Listbox
							:value="routeStore.activeModuleName"
							as="div"
						>
							<div class="relative mt-2">
								<ListboxButton
									class="flex gap-2 items-center justify-between w-full cursor-pointer grid-cols-1 rounded-md bg-gray-100 py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-k-tertiary sm:text-sm/6"
								>
									<VueFeather
										:type="routeStore.activeModule.icon"
										class="size-5"
										aria-hidden="true"
									/>
									<span class="col-start-1 row-start-1 truncate pr-6 flex-grow">
										{{ routeStore.activeModuleName }}
									</span>
									<VueFeather
										type="chevron-down"
										class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
										aria-hidden="true"
									/>
								</ListboxButton>

								<transition
									leave-active-class="transition ease-in duration-100"
									leave-from-class="opacity-100"
									leave-to-class="opacity-0"
								>
									<ListboxOptions
										class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
									>
										<ListboxOption
											v-for="m in routeStore.modules"
											:key="m.name"
											v-slot="{ active, selected }"
											as="template"
											:value="m.name"
											@click="changeModule(m)"
										>
											<li
												:class="[
													active
														? 'bg-k-tertiary text-white outline-hidden'
														: 'text-gray-900',
													'relative cursor-pointer py-2 pr-9 pl-3 select-none flex items-center gap-2'
												]"
											>
												<VueFeather
													:type="m.icon"
													class="size-5"
													aria-hidden="true"
												/>
												<span
													:class="[
														selected ? 'font-semibold' : 'font-normal',
														'block truncate'
													]"
												>
													{{ m.name }}
												</span>
												<span
													v-if="selected"
													:class="[
														active ? 'text-white' : 'text-k-tertiary',
														'absolute inset-y-0 right-0 flex items-center pr-4'
													]"
												>
													<VueFeather
														type="check"
														class="size-5"
														aria-hidden="true"
													/>
												</span>
											</li>
										</ListboxOption>
									</ListboxOptions>
								</transition>
							</div>
						</Listbox>
						<nav class="flex flex-1 flex-col">
							<ul
								role="list"
								class="flex flex-1 flex-col gap-y-7"
							>
								<li>
									<ul
										role="list"
										class="space-y-1"
									>
										<li
											v-for="menu in routeStore.activeModuleRoutes"
											:key="menu.name"
										>
											<a
												:class="[
													isCurrentRouteActive(menu)
														? 'bg-gray-100 text-k-tertiary'
														: 'text-gray-700 hover:bg-gray-100 hover:text-k-tertiary',
													'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
												]"
												:href="menu.href"
												class="items-center"
											>
												{{ menu.name }}
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</TransitionChild>
			</div>
		</TransitionRoot>

		<div
			class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
		>
			<button
				aria-label="Open sidebar"
				class="-m-2.5 p-2.5 text-gray-700 lg:hidden items-center flex flex-col"
				type="button"
				@click="isSidebarMobileOpen = true"
			>
				<span class="sr-only">Open sidebar</span>
				<VueFeather
					type="menu"
					aria-hidden="true"
					size="1.25rem"
				/>
			</button>
			<div class="flex-1 text-lg font-semibold text-gray-700">
				{{ routeStore.activeRoute.name }}
			</div>
		</div>

		<div :class="{ 'lg:pl-72': isSidebarOpen }">
			<div
				class="p-4 sm:p-6 lg:p-8 bg-white shadow-md hidden lg:flex lg:items-center lg:gap-6"
			>
				<button
					aria-label="Open sidebar"
					class="-m-2.5 p-2.5 text-gray-700 items-center sm:hidden lg:flex flex-col"
					type="button"
					@click="isSidebarOpen = !isSidebarOpen"
				>
					<span class="sr-only">Open sidebar</span>
					<VueFeather
						type="menu"
						aria-hidden="true"
						size="1.25rem"
					/>
				</button>
				<h1 class="text-2xl/6 font-semibold text-gray-700">
					{{ routeStore.activeRoute.name }}
				</h1>
			</div>
			<main class="p-4 sm:p-6 lg:p-8">
				<NuxtPage />
			</main>
		</div>
	</div>
</template>

<style lang="sass">
html
	@apply h-full bg-gray-100

body
	@apply	h-full
</style>
