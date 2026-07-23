import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, Shield, Users } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-100ms API response times for optimal performance'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC2 compliant with end-to-end encryption'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Real-time collaboration across multiple divisions'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center py-20">
        <div className="container-responsive grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Enterprise-Grade Platform for
              <span className="text-primary-600"> Multiple Businesses</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Unified digital ecosystem where companies, departments, and teams collaborate seamlessly. 
              Production-ready enterprise SaaS solution.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-8 shadow-2xl">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Industry-leading platform built for enterprise-scale operations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card p-8 hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-primary-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Business Divisions Section */}
      <section className="py-20">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Divisions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Support for 7 independent business lines
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              'Creative Studio',
              'Architecture',
              'Technology',
              'Intelligence',
              'Retail',
              'Academy',
              'Freelance',
              'More...'
            ].map((division, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-6 text-center hover:shadow-xl transition-shadow"
              >
                <h3 className="font-bold">{division}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading enterprises using our platform for unified operations
          </p>
          <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  )
}
