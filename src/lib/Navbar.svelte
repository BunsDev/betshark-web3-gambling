<script>
  import { Router, link } from 'svelte-routing'
  import betshark from '../assets/betshark-logo.png'
  import blahaj from '../assets/blahaj.png'
  import hitmarker from '../audio/hitmarker.mp3'
  const routes = [
    '', //logo
    'slots',
    'dice',
    'coinflip',
    'tickets',
  ]
  let selected = Array(routes.length).fill(false)

  let image, hitmarkerAudio

  const updateSelected = index => {
    hitmarkerAudio.currentTime = 0
    hitmarkerAudio.play()
    selected = selected.map((_, i) => i === index)
  }

  if (Math.floor(Math.random() * (4 - 0 + 1)) + 0 == 0) {
    image = blahaj
  } else {
    image = betshark
  }
  selected[routes.indexOf(window.location.pathname.substring(1))] = true

</script>

<audio src={hitmarker} preload="auto" bind:this={hitmarkerAudio}></audio>
<Router>
  <div class="navbar">
    <div class="nav-container">
      <div class="nav-menu">
        <a href="/" use:link class:imgClicked={selected[0]} on:click={()=>{updateSelected(0)}}>
          <img src={image} alt="Betshark logo" class="betshark-logo" >
        </a>
        {#each routes.slice(1) as page, index}
          <a
            href={"/"+page}
            use:link
            class:clicked={selected[index+1]}
            on:click={() => updateSelected(index+1)}
          >
            {page.charAt(0).toUpperCase()+page.substring(1)}
          </a>
        {/each}
      </div>
    </div>
  </div>
</Router>

<style>
  .navbar {
    background-color: #28a6fa;
    font-size: 40px;
  }
  .nav-container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 10px;
  }
  .nav-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  @media (max-width: 768px) {
    .nav-menu {
      flex-direction: column;
    }
    .nav-menu a {
      margin: 5px;
    }
  }
  .nav-menu a {
    color: white;
    margin-left: 20px;
    margin-right: 20px;
    padding: 5px;
    text-decoration: none;
  }
  .betshark-logo {
    height: 40px;
  }
  a {
    transition-property: transform, color, margin;
    transition-duration: 0.4s, 0.4s, 0.9s;
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    /* transition: margin 0.9s; */
    /* transition: */

    transform: translateY(0);
  }
  a:hover {
    transform: translateY(-5px);
    text-shadow: 0 0 10px;
  }
  .clicked {
    color: rgb(111, 0, 255) !important;
    text-shadow: 0 0 10px;
  }
  .imgClicked {
    /* -webkit-filter: drop-shadow(1px 1px 0 rgb(111, 0, 255)) drop-shadow(-1px -1px 0 rgb(111, 0, 255));
    filter:drop-shadow(1px 1px 0 rgb(111, 0, 255)) drop-shadow(-1px -1px 0 rgb(111, 0, 255)); */
  }
</style>