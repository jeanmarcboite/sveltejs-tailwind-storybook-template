<script>
  import Tailwind from "./Tailwind.svelte";

  export let name;
</script>

<style lang="postcss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;

      .tw {
        @apply font-sans text-lg text-center text-green-800;
      }
    }
  }
</style>

<Tailwind />
<main>
  <h1>Hello {name}!</h1>
  <p class="tw">tailwind included<span class="text-red-800">!</span></p>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>
