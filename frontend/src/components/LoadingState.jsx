function LoadingState({ label = 'Loading data...' }) {
  return (
    <div className="d-flex align-items-center gap-2 text-secondary py-4">
      <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingState;
