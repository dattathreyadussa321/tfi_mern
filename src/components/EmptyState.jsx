function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <h3>No Data Found</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
