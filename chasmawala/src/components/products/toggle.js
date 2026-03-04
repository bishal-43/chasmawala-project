// src/components/products/toggle.js
export const ToggleSwitch = ({ value, onChange, loading }) => {
    return (
        <button
            type="button"
            disabled={loading}
            onClick={onChange}
            className={`w-11 h-6 rounded-full p-1 transition flex items-center
            ${value ? 'bg-green-500' : 'bg-gray-300'}
            ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition
          ${value ? 'translate-x-5' : ''}`}
            />

        </button>
    )
}