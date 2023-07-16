export type Booking = {
  id: number;
  doctorId: number;
  timeSlot: string;
};

export type Doctor = {
  id: number;
  name: string;
  speciality: string;
  price: number;
  rating: number;
};

