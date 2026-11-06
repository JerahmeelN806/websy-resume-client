import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// This is the single registration point for landing-page motion plugins.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
