import TestimonialCard from './components/TestimonialCard';

const testimonials = [
  {
    name: 'Shreyas & Deepa',
    content: [
      'I heard of Wedding Theory from a friend and hired them to manage the photography of my wedding. It was a seamless experience with them, they handled everything with minimal intervention and provided candid and traditional photographs in good amounts.',
      'If you are looking for photographers who will do their job without you having to guide them every step of the way, I would recommend going for them without any second thoughts. They were thoroughly professional and managed to cover all of the rituals. :)'
    ],
    imageUrl: 'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
    videoUrl: 'https://www.youtube.com/watch?v=xZK7cI7AHZg'
  },
  {
    name: 'Swaroopa & Srinath',
    content: [
      'Everything about Wedding Theory is VERY GOOD. I had an absolutely wonderful experience at my wedding. Their pictures are amazing, Very trendy and extremely friendly photographers.',
      'I Should say the photography part in my wedding was completely hassle free because of Wedding Theory. They also have a wide range of album options to select from.'
    ],
    imageUrl: 'https://ik.imagekit.io/weddingtheory/Photos/ADL08862.jpg?updatedAt=1730140125090&tr=w-1080%2Ch-1350%2Cfo-auto',
    videoUrl: 'https://www.youtube.com/watch?v=7Wrlso-4Z-c'
  }
];

export default function TestimonialPage() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow container mx-auto px-4 py-16 md:py-24'>
        <div className='max-w-7xl mx-auto space-y-32'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </main>
    </div>
  );
} 