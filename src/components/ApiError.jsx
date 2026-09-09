function ApiError({
  message,
  onRetry
}) {

  return (
    <div className="api-error-card">

      <div className="api-error-icon">
        ⚠️
      </div>


      <div className="api-error-content">

        <h3>
          Something went wrong
        </h3>

        <p>
          {message}
        </p>

      </div>


      <button
        onClick={onRetry}
        className="api-retry-button"
      >
        ↻ Try again
      </button>

    </div>
  )
}

export default ApiError