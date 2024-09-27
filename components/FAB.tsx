'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { BorderBeam } from '@/magicui/border-beam'

const FloatingActionButton = () => {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 3 }}
    >
      <Link
        href="/"
        aria-label="click"
        className="fixed  right-8 z-50 transform rounded-full bg-gray-900 p-4 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
      >
        Here
        <BorderBeam size={250} duration={12} delay={9} />
      </Link>
    </motion.div>
  )
}

export default FloatingActionButton
