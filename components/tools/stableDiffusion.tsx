"use client";

import React, { useState } from "react";
import concatenateUrls from "@/lib/url";
import Image from "next/image";
import Turnstile, { useTurnstile } from "react-turnstile";

interface StableDiffusionProps {
  site_base_url: string;
}

enum Status {
  // eslint-disable-next-line no-unused-vars
  NotStarted,
  // eslint-disable-next-line no-unused-vars
  Loading,
  // eslint-disable-next-line no-unused-vars
  Success,
  // eslint-disable-next-line no-unused-vars
  Error,
}

function isStatusLoading(status: Status): boolean {
  return status != Status.Loading;
}

function isStatusSuccess(status: Status): boolean {
  return status != Status.Success;
}

function isStatusError(status: Status): boolean {
  return status != Status.Error;
}

const LoadingWidget: React.FC = () => {
  return <div>Loading...</div>;
};

const StableDiffusion: React.FC<StableDiffusionProps> = ({ site_base_url }) => {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(256);
  const [status, setStatus] = useState(Status.NotStarted);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [turnstileResponse, setTurnstileResponse] = useState("");
  const turnstile = useTurnstile();

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          // change size based on input length
          if (e.target.value.length > 100) {
            setSize(512);
          } else {
            setSize(256);
          }
        }}
        placeholder="Enter text to generate Image"
        className="w-full border-2 border-gray-300"
      />
      {
        // turnstile
      }
      <Turnstile
        className="mb-2"
        sitekey="0x4AAAAAAAPHfL5ntRVEMJiY"
        onExpire={() => {
          turnstile.reset();
          setTurnstileResponse("");
        }}
        onVerify={(response) => {
          setTurnstileResponse(response);
        }}
      />
      {
        // a button to generate image
      }
      <button
        onClick={async () => {
          if (turnstileResponse == "") {
            setError(
              "Please complete the human verification." + turnstileResponse
            );
            setStatus(Status.Error);
            return;
          }
          // show loading
          setStatus(Status.Loading);
          // generate image
          turnstile.reset();
          setTurnstileResponse("");
          const response = await fetch(
            concatenateUrls(
              site_base_url,
              "stable_diffusion?prompt=" +
                encodeURIComponent(input) +
                "&cf_turnstile_response=" +
                turnstileResponse
            )
          );
          // if error
          if (!response.ok) {
            // show error
            setError(await response.text());
            setStatus(Status.Error);
            return;
          }
          // the response is a url to the image
          const url = await response.text();
          // show image
          setImage(url);
          setStatus(Status.Success);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Generate Image
      </button>

      <div hidden={isStatusLoading(status)}>
        <LoadingWidget />
      </div>

      <Image
        className="w-full px-2"
        src={image}
        alt="generated image"
        width={size}
        height={size}
        hidden={isStatusSuccess(status)}
      />
      <p hidden={isStatusError(status)}>Error: {error}</p>

      <p className="mt-2">
        This page use{" "}
        <a href="https://blog.cloudflare.com/workers-ai/">
          Cloudflare Workers AI
        </a>{" "}
        to generate image from text.
      </p>
    </>
  );
};

export default StableDiffusion;
