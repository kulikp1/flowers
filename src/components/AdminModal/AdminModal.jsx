import React from "react";
import Modal from "react-modal";
import styles from "./AdminModal.module.css";

const AdminModal = ({
  isOpen,
  onRequestClose,
  editData,
  onEditChange,
  onEditSubmit,
  onDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h3 className={styles.modalTitle}>Редагувати квітку</h3>
      {editData && (
        <div className={styles.formCard}>
          {[
            { label: "Назва квітки", name: "name", type: "text" },
            { label: "Ціна", name: "price", type: "number" },
            { label: "Стара ціна", name: "oldPrice", type: "number" },
            { label: "Кількість", name: "quantity", type: "number" },
            { label: "URL зображення", name: "image", type: "url" },
          ].map(({ label, name, type }) => (
            <div key={name} className={styles.inputGroup}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={editData[name]}
                onChange={onEditChange}
                className={styles.input}
              />
            </div>
          ))}
          <button className={styles.button} onClick={onEditSubmit}>
            Зберегти зміни
          </button>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={onDelete}
          >
            Видалити квітку
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AdminModal;
