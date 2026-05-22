"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[70vh] flex items-center justify-center border-b border-border">
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-none mb-6">
            AURA
          </h1>
          <p className="text-xl tracking-widest uppercase text-muted-foreground">
            Redefining minimalist fashion
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2026, AURA emerged from a vision to create fashion that transcends trends. We believe in the power of minimalism—where every piece speaks through its essential form, unburdened by excess.
              </p>
              <p>
                Our collections are curated for those who appreciate the intersection of brutalist aesthetics and modern luxury. Each garment is designed with intention, crafted to stand the test of time both in quality and style.
              </p>
              <p>
                AURA is more than a brand; it's a philosophy. We embrace darkness not as absence, but as a canvas for light. Our monochromatic palette allows form and texture to take center stage, creating pieces that are as much art as they are apparel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-4 bg-secondary">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Minimalism", description: "Less is more. We strip away the unnecessary to reveal the essential beauty in every design." },
              { title: "Quality", description: "Every piece is crafted with premium materials and meticulous attention to detail." },
              { title: "Sustainability", description: "We believe in creating pieces that last, reducing waste and honoring our planet." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-2xl font-bold tracking-tight mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Get in Touch</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@aura.com"
              className="inline-block border-2 border-white px-8 py-4 font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              CONTACT US
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
