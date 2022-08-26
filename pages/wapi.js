import { useState, setState, useEffect } from "react";
import axios from "axios";

export default function PrivatePage(props) {
  useEffect(() => {
    axios
      .get("https://hcatalog.hocodev.com/wp-json/wp/v2/users")
      .then((response) => {
        console.log(response);
        response.data.map((user) => {
          console.log(user);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
