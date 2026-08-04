import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import toast from 'react-hot-toast';

interface MerchantRatingProps {
  merchantId: string;
  merchantName: string;
  onRated?: () => void;
}

export const MerchantRating = ({ merchantId: _merchantId, merchantName, onRated }: MerchantRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Veuillez donner une note');
      return;
    }
    
    // Simulation d'envoi
    setTimeout(() => {
      setSubmitted(true);
      toast.success('Merci pour votre évaluation !');
      if (onRated) onRated();
    }, 500);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
          <ThumbsUp size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Merci !</h3>
        <p className="text-gray-600">Votre avis a été enregistré</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{merchantName}</h3>
        <p className="text-sm text-gray-500">Comment évaluez-vous ce commerçant ?</p>
      </div>

      {/* Étoiles */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = (hoverRating || rating) >= star;
          return (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="focus:outline-none transform transition hover:scale-110"
            >
              {isActive ? (
                <Star size={32} fill="#FBBF24" stroke="#FBBF24" />
              ) : (
                <Star size={32} stroke="#D1D5DB" />
              )}
            </button>
          );
        })}
      </div>

      {/* Commentaire */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Laissez un commentaire (optionnel)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience..."
          rows={3}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Bouton submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Envoyer l'évaluation
      </button>
    </div>
  );
};
