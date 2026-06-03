export const successResponse = ({ message, data = null }) => ({
  success: true,
  message,
  data,
})

export const errorResponse = ({ message, details = null }) => ({
  success: false,
  message,
  details,
})
