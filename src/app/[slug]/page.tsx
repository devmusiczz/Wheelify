import Add from "../components/Add"
import CustomizeProducts from "../components/CustomizeProducts"
import ProductImages from "../components/ProductImages"

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 ">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages/>
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium" >Product Name</h1>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis laboriosam delectus amet iste vitae.</p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-4" >
            <h3 className="text-xl text-gray-500 line-through">Rs 6000</h3>
            <h2 className="font-medium text-2xl">Rs 3000</h2>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts />
          <Add />
          <div className="h-[2px] bg-gray-100" />
          <div className="text-sm">
            <h4 className="font-medium mb-4" >Title</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum reiciendis corporis repellendus cum atque, deleniti, cupiditate ipsa ea qui id tenetur dolorum fuga distinctio dignissimos.?</p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4" >Title</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum reiciendis corporis repellendus cum atque, deleniti, cupiditate ipsa ea qui id tenetur dolorum fuga distinctio dignissimos.?</p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4" >Title</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum reiciendis corporis repellendus cum atque, deleniti, cupiditate ipsa ea qui id tenetur dolorum fuga distinctio dignissimos.?</p>
          </div>
      </div>
    </div>
  )
}

export default SinglePage