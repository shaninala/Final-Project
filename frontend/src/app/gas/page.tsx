import Form from "../components/gas/Form";

export default function FindGas() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3E0]">
      <div className="flex-1 bg-[#FAF3E0] justify-start py-8 sm:py-12 md:py-16 px-4 pt-40 sm:pt-40 md:pt-40 pb-20">
        <div className="max-w-3xl mx-auto">
          <Form />
        </div>
      </div>
    </div>
  );
}
