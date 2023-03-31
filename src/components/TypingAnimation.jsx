const Typing = ({ size = 2, bg = 'slate-400' }) => (
  <>
    <div className={`typing__dot  w-${size} h-${size} bg-${bg}`} />
    <div className={`typing__dot  w-${size} h-${size} bg-${bg}`} />
    <div className={`typing__dot  w-${size} h-${size} bg-${bg}`} />
  </>
);

export default Typing;
