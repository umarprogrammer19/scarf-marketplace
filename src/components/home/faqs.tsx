"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/mockData";

export default function FAQs() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black/50 to-black">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm tracking-widest uppercase mb-4 block">
                        Help Center
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-white/60 text-lg">
                        Everything you need to know about our products and services
                    </p>
                </div>

                <Accordion.Root type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Accordion.Item
                            key={index}
                            value={`item-${index}`}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-gold/30 transition-all duration-300"
                        >
                            <Accordion.Trigger className="w-full px-8 py-6 flex items-center justify-between text-left group">
                                <span className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                                    {faq.question}
                                </span>
                                <ChevronDown className="w-5 h-5 text-gold transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </Accordion.Trigger>
                            <Accordion.Content className="px-8 pb-6 text-white/70 leading-relaxed">
                                {faq.answer}
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </div>
        </section>
    );
}
