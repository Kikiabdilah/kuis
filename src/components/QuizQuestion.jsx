export default function QuizQuestion({question, answers, onAnswer}) {
  return (
    <>
      <h1
        className="text-lg font-semibold mb-4"
        dangerouslySetInnerHTML={{__html: question.question}}
      />
      <div className="space-y-2">
        {answers.map((ans, i) => (
          <button
            key={i}
            onClick={() => onAnswer(ans)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            dangerouslySetInnerHTML={{__html: ans}}
          />
        ))}
      </div>
    </>
  );
}
