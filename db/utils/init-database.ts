import { User } from "../model/user.model";

export const initDatabase = async () => {
  try {
    const user = new User({
      email: "johndoe@example.com",
      image: {
        alt: "Profile picture of John Doe",
        url: "https://example.com/images/johndoe.jpg",
      },
      isBusiness: false,
      name: {
        first: "John",
        last: "Doe",
      },
      password: "123456",
      phone: "1234567890",
      address: {
        city: "New York",
        country: "USA",
        houseNumber: "123",
        state: "NY",
        street: "Main St",
      },
    });

    const saved = await user.save();
    return saved;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
//admin/moderator
