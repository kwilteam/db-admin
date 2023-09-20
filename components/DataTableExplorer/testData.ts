export const people: IPerson[] = [
  ...Array.from({ length: 100 }, (_, i) => ({
    name: `Person ${i}`,
    title: "Front-end Developer",
    email: `person${i}@example.com`,
    role: "Member",
    address: `Address ${i}`,
    birthplace: `Birthplace ${i}`,
    dob: `DOB ${i}`,
    gender: i % 2 === 0 ? "Male" : "Female",
    phoneNumber: `Phone ${i}`,
    nationality: `Nationality ${i}`,
    maritalStatus: i % 2 === 0 ? "Married" : "Single",
    occupation: `Occupation ${i}`,
    salary: `Salary ${i}`,
    department: `Department ${i}`,
  })),
]

interface IPerson {
  name: string
  title: string
  email: string
  role: string
  address: string
  birthplace: string
  dob: string
  gender: string
  phoneNumber: string
  nationality: string
  maritalStatus: string
  occupation: string
  salary: string
  department: string
}
