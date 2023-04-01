import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "db.json");
export const listContacts = async () => {
  try {
    const data = await fs.readFile(`${contactsPath}`, { encoding: "utf8" });
    const parsedData = JSON.parse(data);
    console.table(parsedData);
    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
export const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(`${contactsPath}`, { encoding: "utf8" });
    const parsedData = JSON.parse(data);
    const contactById = parsedData.find((contact) => contact.id === contactId);
    console.table(contactById);
    return contactById;
  } catch (err) {
    console.log(err);
  }
};
export const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(`${contactsPath}`, { encoding: "utf8" });
    const parsedData = JSON.parse(data);
    const contactsWithoutId = parsedData.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      `${contactsPath}`,
      JSON.stringify(contactsWithoutId, null, 2)
    );
    const newData = await fs.readFile(`${contactsPath}`, {
      encoding: "utf8",
    });
    const parsedNewData = JSON.parse(newData);
    console.table(parsedNewData);
  } catch (err) {
    console.log(err);
  }
};
export const addContact = async (name, email, phone) => {
  try {
    const id = nanoid();
    const user = { id, name, email, phone };
    const fileData = await fs.readFile(`${contactsPath}`, {
      encoding: "utf8",
    });
    const parsedData = JSON.parse(fileData);
    parsedData.push(user);
    await fs.writeFile(`${contactsPath}`, JSON.stringify(parsedData, null, 2));
    const newData = await fs.readFile(`${contactsPath}`, {
      encoding: "utf8",
    });
    const parsedNewData = JSON.parse(newData);
    console.table(parsedNewData);
  } catch (err) {
    console.log(err);
  }
};
