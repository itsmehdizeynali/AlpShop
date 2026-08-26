const SetStatusColor = (
  status: "SUCCESS" | "FAILED" | "PENDING" ,
) => {
  return status === "SUCCESS"
    ? "success"
    : status === "FAILED"
      ? "danger"
      : status === "PENDING"
        ? "warning"
          : "primary";
};

export default SetStatusColor;
