﻿// <auto-generated />
using System;
using CarteiraInvestimentosApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CarteiraInvestimentosApi.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220621143710_InitialCarteiraInvestismentosDatabase")]
    partial class InitialCarteiraInvestismentosDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.6");

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Banco", b =>
                {
                    b.Property<int>("BancoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("BancoNome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("BancoId");

                    b.ToTable("Bancos");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Carteira", b =>
                {
                    b.Property<int>("CarteiraId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CarteiraNome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataInicial")
                        .HasColumnType("TEXT");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("INTEGER");

                    b.HasKey("CarteiraId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Carteiras");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.IndexadorRendimentos", b =>
                {
                    b.Property<int>("IndexadorRendimentosId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("IndexadorRendimentosNome")
                        .HasMaxLength(100)
                        .HasColumnType("INTEGER");

                    b.HasKey("IndexadorRendimentosId");

                    b.ToTable("IndexadorRendimentos");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Login", b =>
                {
                    b.Property<int>("LoginId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("LoginEmail")
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int>("LoginSenha")
                        .HasColumnType("INTEGER");

                    b.HasKey("LoginId");

                    b.ToTable("Logins");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Movimentacao", b =>
                {
                    b.Property<int>("MovimentacaoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DataMovimentacao")
                        .HasColumnType("TEXT");

                    b.Property<int>("PoupancaId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RendaFixaId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RendaVariavelId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StatusMovimentacaoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TesouroDiretoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Unidades")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Valor")
                        .HasColumnType("TEXT");

                    b.HasKey("MovimentacaoId");

                    b.HasIndex("PoupancaId");

                    b.HasIndex("RendaFixaId");

                    b.HasIndex("RendaVariavelId");

                    b.HasIndex("StatusMovimentacaoId");

                    b.HasIndex("TesouroDiretoId");

                    b.ToTable("Movimentacoes");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Poupanca", b =>
                {
                    b.Property<int>("PoupancaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BancoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CarteiraId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Rendimento")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("ValorTotalInvestido")
                        .HasColumnType("TEXT");

                    b.HasKey("PoupancaId");

                    b.HasIndex("BancoId");

                    b.HasIndex("CarteiraId");

                    b.ToTable("Poupancas");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.ProdutoRendaFixa", b =>
                {
                    b.Property<int>("ProdutoRendaFixaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ProdutoRendaFixaNome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("ProdutoRendaFixaId");

                    b.ToTable("ProdutoRendaFixas");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.ProdutoRendaVariavel", b =>
                {
                    b.Property<int>("ProdutoRendaVariavelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ProdutoRendaVariavelNome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("ProdutoRendaVariavelId");

                    b.ToTable("ProdutoRendaVariavels");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.RendaFixa", b =>
                {
                    b.Property<int>("RendaFixaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BancoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CarteiraId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Custos")
                        .HasColumnType("TEXT");

                    b.Property<int>("IndexadorRendimentosId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Liquidez")
                        .HasColumnType("TEXT");

                    b.Property<string>("NomeRendaFixa")
                        .HasColumnType("TEXT");

                    b.Property<int>("ProdutoRendaFixaId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Rendimento")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Rentabilidae")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Vencimento")
                        .HasColumnType("TEXT");

                    b.HasKey("RendaFixaId");

                    b.HasIndex("BancoId");

                    b.HasIndex("CarteiraId");

                    b.HasIndex("IndexadorRendimentosId");

                    b.HasIndex("ProdutoRendaFixaId");

                    b.ToTable("RendaFixas");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.RendaVariavel", b =>
                {
                    b.Property<int>("RendaVariavelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BancoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CarteiraId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("CotacaoAtual")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("CotacaoMedia")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Custos")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<string>("NomeDoPapel")
                        .HasColumnType("TEXT");

                    b.Property<int>("ProdutoRendaVariavelId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Rendimento")
                        .HasColumnType("TEXT");

                    b.Property<int>("Unidades")
                        .HasColumnType("INTEGER");

                    b.HasKey("RendaVariavelId");

                    b.HasIndex("BancoId");

                    b.HasIndex("CarteiraId");

                    b.HasIndex("ProdutoRendaVariavelId");

                    b.ToTable("RendaVariaveis");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.StatusMovimentacao", b =>
                {
                    b.Property<int>("StatusMovimentacaoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("StatusMovimentacaoNome")
                        .HasColumnType("TEXT");

                    b.HasKey("StatusMovimentacaoId");

                    b.ToTable("StatusMovimentacoes");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.TesouroDireto", b =>
                {
                    b.Property<int>("TesouroDiretoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BancoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CarteiraId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Custos")
                        .HasColumnType("TEXT");

                    b.Property<int>("IndexadorRendimentosId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Liquidez")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Rendimento")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Rentabilidade")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("ValorTotalInvestido")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Vencimento")
                        .HasColumnType("TEXT");

                    b.HasKey("TesouroDiretoId");

                    b.HasIndex("BancoId");

                    b.HasIndex("CarteiraId");

                    b.HasIndex("IndexadorRendimentosId");

                    b.ToTable("TesouroDiretos");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Usuario", b =>
                {
                    b.Property<int>("UsuarioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("UsuarioCpf")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("TEXT");

                    b.Property<string>("UsuarioEmail")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("TEXT");

                    b.Property<string>("UsuarioNome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("UsuarioSenha")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UsuarioSobrenome")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("TEXT");

                    b.Property<string>("UsuarioTelefone")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("TEXT");

                    b.HasKey("UsuarioId");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Carteira", b =>
                {
                    b.HasOne("CarteiraInvestimentosApi.Models.Usuario", "Usuario")
                        .WithMany("Carteiras")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Movimentacao", b =>
                {
                    b.HasOne("CarteiraInvestimentosApi.Models.Poupanca", "Poupanca")
                        .WithMany()
                        .HasForeignKey("PoupancaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.RendaFixa", "RendaFixa")
                        .WithMany()
                        .HasForeignKey("RendaFixaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.RendaVariavel", "RendaVariavel")
                        .WithMany()
                        .HasForeignKey("RendaVariavelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.StatusMovimentacao", "StatusMovimentacao")
                        .WithMany("Movimentacoes")
                        .HasForeignKey("StatusMovimentacaoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.TesouroDireto", "TesouroDireto")
                        .WithMany()
                        .HasForeignKey("TesouroDiretoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Poupanca");

                    b.Navigation("RendaFixa");

                    b.Navigation("RendaVariavel");

                    b.Navigation("StatusMovimentacao");

                    b.Navigation("TesouroDireto");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Poupanca", b =>
                {
                    b.HasOne("CarteiraInvestimentosApi.Models.Banco", "Banco")
                        .WithMany()
                        .HasForeignKey("BancoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.Carteira", "Carteira")
                        .WithMany()
                        .HasForeignKey("CarteiraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Banco");

                    b.Navigation("Carteira");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.RendaFixa", b =>
                {
                    b.HasOne("CarteiraInvestimentosApi.Models.Banco", "Banco")
                        .WithMany()
                        .HasForeignKey("BancoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.Carteira", "Carteira")
                        .WithMany()
                        .HasForeignKey("CarteiraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.IndexadorRendimentos", "IndexadorRendimentos")
                        .WithMany()
                        .HasForeignKey("IndexadorRendimentosId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.ProdutoRendaFixa", "ProdutoRendaFixa")
                        .WithMany()
                        .HasForeignKey("ProdutoRendaFixaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Banco");

                    b.Navigation("Carteira");

                    b.Navigation("IndexadorRendimentos");

                    b.Navigation("ProdutoRendaFixa");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.RendaVariavel", b =>
                {
                    b.HasOne("CarteiraInvestimentosApi.Models.Banco", "Banco")
                        .WithMany()
                        .HasForeignKey("BancoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.Carteira", "Carteira")
                        .WithMany()
                        .HasForeignKey("CarteiraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.ProdutoRendaVariavel", "ProdutoRendaVariavel")
                        .WithMany("RendaVariavels")
                        .HasForeignKey("ProdutoRendaVariavelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Banco");

                    b.Navigation("Carteira");

                    b.Navigation("ProdutoRendaVariavel");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.TesouroDireto", b =>
                {
                    b.HasOne("CarteiraInvestimentosApi.Models.Banco", "Banco")
                        .WithMany()
                        .HasForeignKey("BancoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.Carteira", "Carteira")
                        .WithMany()
                        .HasForeignKey("CarteiraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarteiraInvestimentosApi.Models.IndexadorRendimentos", "IndexadorRendimentos")
                        .WithMany()
                        .HasForeignKey("IndexadorRendimentosId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Banco");

                    b.Navigation("Carteira");

                    b.Navigation("IndexadorRendimentos");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.ProdutoRendaVariavel", b =>
                {
                    b.Navigation("RendaVariavels");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.StatusMovimentacao", b =>
                {
                    b.Navigation("Movimentacoes");
                });

            modelBuilder.Entity("CarteiraInvestimentosApi.Models.Usuario", b =>
                {
                    b.Navigation("Carteiras");
                });
#pragma warning restore 612, 618
        }
    }
}
