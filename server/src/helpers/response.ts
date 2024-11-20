export const successResponse = (data: [], message: String) => ({
  success: true,
  data,
  message,
});

export const errorResponse = (message: String) => ({
  success: false,
  message,
});
