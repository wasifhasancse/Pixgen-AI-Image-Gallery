import AddProductModal from "@/components/Dashboard/Seller/AddProductModal";

const SellerProductPage = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
            Products
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your items and publish new products to your store.
          </p>
        </div>
        <AddProductModal />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
        No products yet. Click{" "}
        <span className="font-semibold">Add Product</span> to create your first
        item.
      </div>
    </section>
  );
};

export default SellerProductPage;
