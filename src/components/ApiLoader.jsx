function ApiLoader({ message = "Curioo is thinking..." }) {
  return (
    <div className="api-loader-wrapper">
      <div className="api-loader-card">
        <div className="api-loader-orbit">
          <div className="api-loader-core">✦</div>

          <span />
          <span />
          <span />
        </div>

        <div className="api-loader-content">
          <h3>{message}</h3>

          <p>Preparing your explanation...</p>

          <div className="api-loader-track">
            <div className="api-loader-progress" />
          </div>

          <div className="api-loader-status">
            <span className="api-status-dot" />

            <span>Connecting to Curioo AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiLoader;
