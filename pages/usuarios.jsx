import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios or your preferred HTTP client library
import TableChakra from "@/app/components/TableChakra"; // Assuming this is correctly imported

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/users");
        setUsers(response.data); // Assuming your API returns an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const userColumns = [
    { label: "Nome", key: "name" },
    { label: "Idade", key: "age" },
    { label: "Whatsapp", key: "phone" },
  ];

  return (
    <div>
      <TableChakra columns={userColumns} data={users} />
    </div>
  );
};

export default Index;
