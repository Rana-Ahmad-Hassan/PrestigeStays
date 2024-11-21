export const successResponse = (data: any, message: String) => ({
  success: true,
  data,
  message,
});

export const errorResponse = (message: String) => ({
  success: false,
  message,
});
