

export const Duration = (createdAt:string, updatedAt:string) => {

    if (!createdAt || !updatedAt) {
      return "Invalid dates";
    }
    


  const diffMs = new Date(updatedAt).getTime() - new Date(createdAt).getTime();
  const diffMins = diffMs / (1000 * 60);

  if (diffMins < 60) {
    return `${diffMins.toFixed(2)} minutes`;
  } else {
    const diffHours = diffMins / 60;
    return `${diffHours.toFixed(2)} hours`;
  }
};
