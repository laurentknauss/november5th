"use client"
import { useId } from "react"
import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import type { Container, SingleOrMultiple } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { cn } from "@/app/lib/utils"
import { motion } from "framer-motion"

type ParticlesProps = {
  id?: string
  className?: string
  background?: string
  particleSize?: number
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export const SparklesCore = ({
  id,
  className,
  background,
  minSize = 1,
  maxSize = 3,
  speed = 1,
  particleColor = "#ffffff",
  particleDensity = 120
}: ParticlesProps) => {
  const [init, setInit] = useState(false)
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container) => {
    console.log("Particles container loaded", container)
  }

  const generatedId = useId()

  if (!init) return null

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("relative", className)}
    >
      <Particles
        id={id || generatedId}
        className="absolute inset-0 z-0"
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: background || "transparent"
            }
          },
          fullScreen: {
            enable: false,
            zIndex: 1
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push"
              },
              onHover: {
                enable: false,
                mode: "repulse"
              },
              resize: {
                enable: true, 
                
              }
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: particleColor
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out"
              },
              random: false,
              speed: {
                min: 0.1,
                max: speed
              }
            },
            number: {
              density: {
                enable: true,
                width: 400,
                height: 400
              },
              value: particleDensity
            },
            opacity: {
              value: {
                min: 0.1,
                max: 1
              },
              animation: {
                enable: true,
                speed: 1,
              
              }
            },
            shape: {
              type: "circle"
            },
            size: {
              value: {
                min: minSize,
                max: maxSize
              }
            }
          },
          detectRetina: true
        }}
      />
    </motion.div>
  )
}
