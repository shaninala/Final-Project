import Button from "./Button";

export default function Form() {
  return (
    <>
      <form>
        <h1>Search Gas Station</h1>
        <div>
          <label>Zip Code/City:</label>
        </div>
        <div>
          <div>
            <label>Fuel Type</label>
          </div>
        </div>
        <div>
          <label>Self-Service</label>
        </div>
        <div>
          <Button type="submit">Search Gas Station</Button>
        </div>
      </form>
    </>
  );
}
