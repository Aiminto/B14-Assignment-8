"use client"


const EventTwoBooking = async () => {


    const handlePaymentForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const paymentFormData = Object.fromEntries(formData.entries());
        console.log(paymentFormData, 'pztkrllr dat');

        const payment = await fetch(`http://localhost:5000/payment2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentFormData)
        })
        console.log("payment clint", payment)


    }





    return (
        <div>
            event two booking
            <form onSubmit={handlePaymentForm}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Page details</legend>

                    <label className="label">Title</label>
                    <input type="text" className="input" placeholder="My awesome page" />

                    <label className="label">Slug</label>
                    <input type="text" className="input" placeholder="my-awesome-page" />

                    <label className="label">Author</label>
                    <input type="text" className="input" placeholder="Name" />
                </fieldset>
            </form>
        </div>
    );
};

export default EventTwoBooking;