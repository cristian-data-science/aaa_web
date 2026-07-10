import { motion } from 'framer-motion'

const wordVariants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Texto que aparece palabra a palabra (sube + desenfoque→nítido).
// highlightFrom: índice de palabra desde el que se aplica highlightClassName.
// inView: true para animar al entrar en viewport en vez de al montar.
const RevealText = ({
  text,
  as: Tag = 'h2',
  className = '',
  highlightFrom = -1,
  highlightClassName = 'gradient-text',
  delay = 0,
  stagger = 0.05,
  inView = false,
}) => {
  const MotionTag = motion.create(Tag)
  const words = text.split(' ')
  const viewProps = inView
    ? { whileInView: 'visible', viewport: { once: true, margin: '-60px' } }
    : { animate: 'visible' }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...viewProps}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <motion.span
            className={`inline-block ${highlightFrom >= 0 && i >= highlightFrom ? highlightClassName : ''}`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  )
}

export default RevealText
