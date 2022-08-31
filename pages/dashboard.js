import { useState, setState } from "react";
import axios from "axios";
import Image from "next/image";
import Papa from "papaparse";
import Loading from "../components/LoadingRing";
import Layout from "../components/MainLayout/Layout";
import FileUpload from "../components/upload-form";

export default function Dashboard(props) {
  return (
    <Layout title="Dashboard">
      <div className="container">
        <div className="row">
          <p>Hello this is test page</p>
        </div>
      </div>
    </Layout>
  );
}
