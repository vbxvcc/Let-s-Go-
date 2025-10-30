export const translations = {
  // App.tsx
  user: { id: 'Pengguna', en: 'User' },
  jobTitleDefault: { id: 'Jabatan', en: 'Position' },
  institutionDefault: { id: 'Lembaga', en: 'Institution' },

  // ItemForm.tsx
  shoppingInput: { id: 'Input Belanja', en: 'Shopping Input' },
  itemNameLabel: { id: 'Nama Barang', en: 'Item Name' },
  itemNamePlaceholder: { id: 'cth: iPhone', en: 'e.g., iPhone' },
  shoppingDateLabel: { id: 'Tanggal Belanja', en: 'Shopping Date' },
  quantityLabel: { id: 'Jumlah', en: 'Quantity' },
  unitLabel: { id: 'Satuan', en: 'Unit' },
  unitPriceLabel: { id: 'Harga Satuan', en: 'Unit Price' },
  totalPriceLabel: { id: 'Total Harga', en: 'Total Price' },
  formError: { id: 'Harap isi semua kolom dengan benar.', en: 'Please fill all fields correctly.' },
  addButton: { id: '+ Tambah ke Daftar', en: '+ Add to List' },
  
  // ItemList.tsx
  shoppingList: { id: 'Daftar Belanja', en: 'Shopping List' },
  clearAllButton: { id: 'Hapus Semua', en: 'Clear All' },
  emptyListMessage: { id: 'Daftar belanja masih kosong.', en: 'The shopping list is empty.' },
  tableDate: { id: 'Tanggal', en: 'Date' },
  tableItem: { id: 'Barang', en: 'Item' },
  tableQuantity: { id: 'Jumlah', en: 'Quantity' },
  tableUnitPrice: { id: 'Harga Satuan', en: 'Unit Price' },
  tableTotal: { id: 'Total', en: 'Total' },
  deleteAction: { id: 'Hapus', en: 'Delete' },
  grandTotal: { id: 'Total Keseluruhan', en: 'Grand Total' },
  exportButton: { id: 'Export ke PDF', en: 'Export to PDF' },
  
  // ProfileModal.tsx
  editProfileTitle: { id: 'Edit Profil', en: 'Edit Profile' },
  changePhotoButton: { id: 'Ganti Foto', en: 'Change Photo' },
  nameLabel: { id: 'Nama', en: 'Name' },
  namePlaceholder: { id: 'Masukkan nama Anda', en: 'Enter your name' },
  jobTitleLabel: { id: 'Jabatan', en: 'Position' },
  jobTitlePlaceholder: { id: 'Masukkan jabatan Anda', en: 'Enter your position' },
  institutionLabel: { id: 'Lembaga', en: 'Institution' },
  institutionPlaceholder: { id: 'Masukkan nama lembaga', en: 'Enter institution name' },
  idNumberLabel: { id: 'No ID', en: 'ID Number' },
  idNumberPlaceholder: { id: 'Masukkan nomor ID Anda', en: 'Enter your ID number' },
  addressLabel: { id: 'Alamat', en: 'Address' },
  addressPlaceholder: { id: 'Masukkan alamat Anda', en: 'Enter your address' },
  cancelButton: { id: 'Batal', en: 'Cancel' },
  saveButton: { id: 'Simpan', en: 'Save' },

  // PDF Export
  pdfTitle: { id: 'Daftar Belanja', en: 'Shopping List' },
  pdfName: { id: 'Nama', en: 'Name' },
  pdfJobTitle: { id: 'Jabatan', en: 'Position' },
  pdfInstitution: { id: 'Lembaga', en: 'Institution' },
  pdfIdNumber: { id: 'No ID', en: 'ID Number' },
  pdfAddress: { id: 'Alamat', en: 'Address' },
};

export type TranslationKey = keyof typeof translations;
