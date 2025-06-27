import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminFlowerForm.module.css";
import AdminHeader from "../AdminNavigation/AdminNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminModal from "../AdminModal/AdminModal";

const AdminFlowerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    quantity: "",
    image: "",
    disabled: false,
  });

  const [flowers, setFlowers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFlowers = async () => {
    try {
      const res = await axios.get(
        "https://6804fc41ca467c15be67df54.mockapi.io/flowers"
      );
      setFlowers(res.data);
    } catch {
      toast.error("Не вдалося отримати список квітів");
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flowerData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      quantity: Number(formData.quantity),
    };

    try {
      await axios.post(
        "https://6804fc41ca467c15be67df54.mockapi.io/flowers",
        flowerData
      );
      toast.success("Квітку додано успішно!");
      setFormData({
        name: "",
        price: "",
        oldPrice: "",
        quantity: "",
        image: "",
        disabled: false,
      });
      fetchFlowers();
    } catch (error) {
      toast.error("Сталася помилка при додаванні квітки");
      console.error(error);
    }
  };

  const openEditModal = (flower) => {
    setEditData(flower);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `https://6804fc41ca467c15be67df54.mockapi.io/flowers/${editData.id}`,
        {
          ...editData,
          price: Number(editData.price),
          oldPrice: Number(editData.oldPrice),
          quantity: Number(editData.quantity),
        }
      );
      toast.success("Квітку оновлено!");
      setIsModalOpen(false);
      fetchFlowers();
    } catch (error) {
      toast.error("Помилка при оновленні");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!editData) return;

    try {
      await axios.delete(
        `https://6804fc41ca467c15be67df54.mockapi.io/flowers/${editData.id}`
      );
      toast.success("Квітку видалено!");
      setIsModalOpen(false);
      fetchFlowers();
    } catch (error) {
      toast.error("Помилка при видаленні квітки");
      console.error(error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <h2 className={styles.title}>Список квітів</h2>
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className={styles.flowerCard}
              onClick={() => openEditModal(flower)}
            >
              <img
                src={flower.image}
                alt={flower.name}
                className={styles.image}
              />
              <div>
                <h4>{flower.name}</h4>
                <p>Ціна: {flower.price} грн</p>
              </div>
            </div>
          ))}
        </div>

        
            ))}
            <button type="submit" className={styles.button}>
              Додати квітку
            </button>
          </form>
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        editData={editData}
        onEditChange={handleEditChange}
        onEditSubmit={handleEditSubmit}
        onDelete={handleDelete}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default AdminFlowerForm;
