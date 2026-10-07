const useStatus = () => {
  const setColor = (
    status:
      | "SUCCESS"
      | "FAILED"
      | "PENDING"
      | "DELIVERED"
      | "CANCELLED"
      | "SHIPPED"
      | "RETURNED",
  ) => {
    return status === "SUCCESS"
      ? "success"
      : status === "DELIVERED"
        ? "success"
        : status === "FAILED"
          ? "danger"
          : status === "CANCELLED"
            ? "danger"
            : status === "RETURNED"
              ? "danger"
              : status === "PENDING"
                ? "warning"
              : status === "SHIPPED"
                ? "info"
                : "primary";
  };
  return { setColor };
};

export default useStatus;
