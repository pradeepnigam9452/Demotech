export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 h-full hover:shadow-xl transition duration-300">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

    </div>
  );
}