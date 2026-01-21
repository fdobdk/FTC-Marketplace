import { motion } from 'framer-motion'

function LoadingSpinner({ fullScreen = false, size = 40 }) {
  const spinner = (
    <div className="spinner-container">
      <motion.div
        className="spinner"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="spinner-inner" />
      </motion.div>

      <style>{`
        .spinner-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-dark);
          z-index: 9999;
        }

        .spinner-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .spinner {
          position: relative;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            var(--primary) 360deg
          );
          mask: radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px));
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px));
        }

        .spinner-inner {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: var(--bg-dark);
        }
      `}</style>
    </div>
  )

  if (fullScreen) {
    return <div className="spinner-wrapper">{spinner}</div>
  }

  return spinner
}

export default LoadingSpinner
