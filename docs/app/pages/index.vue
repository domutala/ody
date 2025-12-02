<template>
  <div>
    <UPageHero
      description=""
      :links="[
        {
          label: 'Get started',
          trailingIcon: 'i-lucide-chevron-right',
          size: 'xl',
          color: 'neutral',
          class: 'rounded-full py-3! px-4',
          ui: { trailingIcon: 'size-4' },
        },

        {
          label: 'npm install ody@latest',
          size: 'xl',
          color: 'neutral',
          variant: 'ghost',
          icon: 'i-lucide-copy',
          class: 'rounded-full py-3! px-4',
          ui: { leadingIcon: 'size-4' },
        },
      ]"
    >
      <!-- <template #title>
        <div class="mx-5 text-primary">
          <AppLogo class="w-36 h-auto mx-auto" />
        </div>
      </template> -->

      <template #description>
        <div class="text-highlighted text-2xl">
          <b>Ody</b> is an ultra-fast and strongly typed data validator. It is
          built on a <b>sequential and immutable pipeline</b> of rules
          (validators and transformers).
        </div>
      </template>
    </UPageHero>
  </div>
</template>
